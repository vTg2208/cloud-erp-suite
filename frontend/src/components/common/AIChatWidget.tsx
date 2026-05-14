import { useState, useRef, useEffect } from 'react'
import { FiMessageSquare, FiX, FiSend } from 'react-icons/fi'

interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
}

const aiResponses = [
  "Based on the current data, your revenue has increased by 12.5% this month.",
  "I found 3 purchase orders pending approval. Would you like me to show them?",
  "The inventory for Widget B is below reorder level. Consider placing a new order.",
  "Your team has completed 8 tasks this week, which is 15% above average.",
  "I can help you create reports, check balances, or analyze trends. What do you need?",
  "The payroll for April has been processed successfully for 42 employees.",
]

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your Amdox ERP assistant. How can I help you today?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = () => {
    if (!input.trim()) return

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        sender: 'ai',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMsg])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300 animate-pulse-glow"
        title="AI Assistant"
      >
        <FiMessageSquare size={20} />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></span>
      </button>
    )
  }

  return (
    <div className="fixed right-6 bottom-6 z-50 w-96 animate-slide-in">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <FiMessageSquare className="text-white" size={16} />
            </div>
            <div>
              <h3 className="text-white font-medium text-sm">AI Assistant</h3>
              <p className="text-white/70 text-xs">Always online</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 text-white/70 hover:text-white transition-colors"
          >
            <FiX size={18} />
          </button>
        </div>

        <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-950">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                  msg.sender === 'user'
                    ? 'bg-primary-600 text-white rounded-br-sm'
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm rounded-bl-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-gray-800 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-3 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              className="flex-1 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-gray-100"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className="p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              <FiSend size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
