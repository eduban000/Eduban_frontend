import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChatAssistant } from '@/components/Chat/ChatAssistant';
import { useChatStore } from '@/store/chatStore';
import { useCourseStore } from '@/store/courseStore';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';

// Mock the stores
jest.mock('@/store/chatStore');
jest.mock('@/store/courseStore');
jest.mock('@/hooks/useWebSocket');
jest.mock('@/hooks/useSpeechRecognition');
jest.mock('@/hooks/useTextToSpeech');

const mockChatStore = useChatStore as jest.MockedFunction<typeof useChatStore>;
const mockCourseStore = useCourseStore as jest.MockedFunction<typeof useCourseStore>;
const mockUseWebSocket = useWebSocket as jest.MockedFunction<typeof useWebSocket>;
const mockUseSpeechRecognition = useSpeechRecognition as jest.MockedFunction<typeof useSpeechRecognition>;
const mockUseTextToSpeech = useTextToSpeech as jest.MockedFunction<typeof useTextToSpeech>;

const defaultSpeechRecognition = {
  isListening: false,
  transcript: '',
  startListening: jest.fn(),
  stopListening: jest.fn(),
  supported: true,
};

describe('ChatAssistant', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Default hook implementations (components destructure these on render)
    mockUseWebSocket.mockReturnValue({
      sendMessage: jest.fn(),
      isConnected: true,
      connectionStatus: 'connected',
    } as any);
    mockUseSpeechRecognition.mockReturnValue({ ...defaultSpeechRecognition } as any);
    mockUseTextToSpeech.mockReturnValue({
      speak: jest.fn(),
      speaking: false,
      cancel: jest.fn(),
      supported: true,
    } as any);

    // Mock store implementations
    mockChatStore.mockReturnValue({
      addMessage: jest.fn(),
      getChatHistory: jest.fn().mockResolvedValue([]),
      clearHistory: jest.fn(),
      currentMessages: [],
      isTyping: false,
      currentCourseId: undefined,
      setTyping: jest.fn(),
      setCurrentCourse: jest.fn(),
      chatHistories: [],
      studyReminders: [],
      addStudyReminder: jest.fn(),
      markReminderSent: jest.fn(),
      clearSentReminders: jest.fn(),
      saveChatHistory: jest.fn(),
      deleteHistory: jest.fn(),
      clearCurrentChat: jest.fn()
    } as any);

    mockCourseStore.mockReturnValue({
      currentCourse: {
        id: 'course-1',
        title: 'Test Course',
        content: 'Test content',
        progress: 50,
        topics: ['Topic 1', 'Topic 2']
      },
      availableCourses: [],
      enrolledCourses: [],
      studyStreak: 5,
      totalStudyTime: 120,
      lastStudyDate: new Date(),
      setCurrentCourse: jest.fn(),
      enrollInCourse: jest.fn(),
      unenrollFromCourse: jest.fn(),
      updateProgress: jest.fn(),
      loadAvailableCourses: jest.fn(),
      loadEnrolledCourses: jest.fn(),
      addCourse: jest.fn(),
      updateCourse: jest.fn(),
      startStudySession: jest.fn(),
      endStudySession: jest.fn(),
      updateStudyStreak: jest.fn(),
      getCourseContext: jest.fn().mockReturnValue({
        courseTitle: 'Test Course',
        courseContent: 'Test content',
        currentProgress: 50,
        topics: ['Topic 1', 'Topic 2']
      })
    } as any);
  });

  it('renders chat assistant with welcome message', () => {
    render(<ChatAssistant />);
    
    expect(screen.getByText('Learning Assistant')).toBeInTheDocument();
    expect(screen.getByText('Welcome to your Learning Assistant!')).toBeInTheDocument();
  });

  it('displays course information when provided', () => {
    render(<ChatAssistant courseId="course-1" />);
    
    expect(screen.getByText('Currently helping with: Test Course')).toBeInTheDocument();
  });

  it('allows sending messages', async () => {
    const mockAddMessage = jest.fn();
    mockChatStore.mockReturnValue({
      ...mockChatStore(),
      addMessage: mockAddMessage
    } as any);

    render(<ChatAssistant />);
    
    const input = screen.getByPlaceholderText('Ask me anything about your course...');
    const sendButton = screen.getByTitle('Send message');
    
    fireEvent.change(input, { target: { value: 'Hello, AI!' } });
    fireEvent.click(sendButton);
    
    expect(mockAddMessage).toHaveBeenCalledWith({
      id: expect.any(String),
      content: 'Hello, AI!',
      type: 'user',
      timestamp: expect.any(Date),
      attachments: []
    });
  });

  it('shows typing indicator when AI is responding', async () => {
    // A send that never resolves keeps the component in its "typing" state.
    mockUseWebSocket.mockReturnValue({
      sendMessage: jest.fn(() => new Promise(() => {})),
      isConnected: true,
      connectionStatus: 'connected',
    } as any);

    render(<ChatAssistant />);

    const input = screen.getByPlaceholderText('Ask me anything about your course...');
    fireEvent.change(input, { target: { value: 'Hello, AI!' } });
    fireEvent.click(screen.getByTitle('Send message'));

    // TypingIndicator renders with an animate-pulse wrapper.
    await waitFor(() => {
      expect(document.querySelector('.animate-pulse')).toBeInTheDocument();
    });
  });

  it('handles voice input when supported', () => {
    const mockStartListening = jest.fn();

    mockUseSpeechRecognition.mockReturnValue({
      isListening: false,
      transcript: '',
      startListening: mockStartListening,
      stopListening: jest.fn(),
      supported: true,
    } as any);

    render(<ChatAssistant />);

    // Both the header and the input render a voice button; the header's toggles listening.
    const voiceButton = screen.getAllByTitle('Start voice input')[0];
    fireEvent.click(voiceButton);

    expect(mockStartListening).toHaveBeenCalled();
  });

  it('displays error message when WebSocket is disconnected', () => {
    mockUseWebSocket.mockReturnValue({
      sendMessage: jest.fn(),
      isConnected: false,
      connectionStatus: 'disconnected',
    } as any);

    render(<ChatAssistant />);
    
    expect(screen.getByText('Offline')).toBeInTheDocument();
  });

  it('supports keyboard shortcuts for sending messages', () => {
    const mockAddMessage = jest.fn();
    mockChatStore.mockReturnValue({
      ...mockChatStore(),
      addMessage: mockAddMessage
    } as any);

    render(<ChatAssistant />);
    
    const input = screen.getByPlaceholderText('Ask me anything about your course...');

    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13, keyCode: 13 });

    expect(mockAddMessage).toHaveBeenCalled();
  });

  it('shows settings panel when settings button is clicked', () => {
    render(<ChatAssistant />);
    
    const settingsButton = screen.getByTitle('Settings');
    fireEvent.click(settingsButton);
    
    expect(screen.getByText('Chat Settings')).toBeInTheDocument();
    expect(screen.getByText('Language')).toBeInTheDocument();
  });

  it('handles file attachments', async () => {
    const { container } = render(<ChatAssistant />);

    // The visible "Attach file" control proxies to a hidden <input type="file">.
    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByText('test.txt')).toBeInTheDocument();
    });
  });
});
