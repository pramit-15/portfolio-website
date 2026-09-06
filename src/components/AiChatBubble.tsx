"use client";

import React, { useState, useRef, useEffect } from "react";
import { findLocalKnowledgeAnswer } from "../data/knowledgeBase";
import { X, Send, Terminal, RefreshCw, Copy, Check } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  source?: "gemini" | "local-knowledge";
}

const promptChips = [
  "Why LangGraph over linear chains?",
  "How does 5-provider failover work?",
  "Explain 99.93% ROC-AUC validation",
  "Automated testing architecture?",
];

interface AiChatBubbleProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const AiChatBubble: React.FC<AiChatBubbleProps> = ({ isOpen, onClose, onOpen }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello. I am Pramit's AI Engineering Assistant. Ask me anything about his LangGraph agent architecture, multi-LLM failover matrix, stacked clinical ML ensembles, or 144+ automated test suites.",
      source: "local-knowledge",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Global ⌘K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onOpen();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input.trim();
    if (!textToSend || loading) return;

    const userMessage: Message = { role: "user", content: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend }),
      });

      const data = await res.json();

      if (res.ok && !data.fallback && data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply, source: "gemini" },
        ]);
      } else {
        const localAnswer = findLocalKnowledgeAnswer(textToSend);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: localAnswer, source: "local-knowledge" },
        ]);
      }
    } catch {
      const localAnswer = findLocalKnowledgeAnswer(textToSend);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: localAnswer, source: "local-knowledge" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Docked Floating Trigger */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={onOpen}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-surface hairline-border hover:border-accent text-white shadow-xl transition-all font-mono text-xs"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <Terminal className="w-4 h-4 text-accent" />
            <span className="font-semibold text-white">Ask AI Assistant</span>
            <kbd className="hidden sm:inline px-1.5 py-0.5 rounded bg-canvas text-[10px] text-muted border border-white/[0.1]">
              ⌘K
            </kbd>
          </button>
        </div>
      )}

      {/* Expanded Terminal Drawer */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[440px] max-h-[580px] flex flex-col rounded-2xl bg-terminal-base hairline-border shadow-2xl font-mono text-xs overflow-hidden backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#171717] border-b hairline-divider">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-accent" />
              <div>
                <div className="text-white font-bold text-xs">Pramit AI Assistant</div>
                <div className="text-[10px] text-accent flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Dual-Mode (Gemini 2.0 + Local Knowledge Engine)
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded-lg text-muted hover:text-white hover:bg-surface transition-colors"
              aria-label="Close AI assistant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Prompt Chips */}
          <div className="p-2.5 bg-[#141414] border-b hairline-divider flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {promptChips.map((chip, i) => (
              <button
                key={i}
                onClick={() => handleSend(chip)}
                className="px-2.5 py-1 rounded-md bg-surface/60 hairline-border hover:border-accent text-primary text-[10px] whitespace-nowrap hover:text-white transition-all shrink-0"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 max-h-[340px]">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${
                  msg.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[88%] p-3 rounded-xl leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-accent text-canvas font-semibold font-sans"
                      : "bg-surface/50 hairline-border text-primary font-sans text-xs"
                  }`}
                >
                  {msg.content}
                </div>

                {msg.role === "assistant" && (
                  <div className="flex items-center gap-2 text-[9px] text-muted mt-1 px-1">
                    <span>
                      Engine: {msg.source === "gemini" ? "Gemini 2.0 Flash" : "Pre-Indexed Engine"}
                    </span>
                    <span>•</span>
                    <button
                      onClick={() => handleCopy(msg.content, idx)}
                      className="hover:text-white flex items-center gap-1"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="w-2.5 h-2.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-2.5 h-2.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-accent text-xs p-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Synthesizing architectural specifications...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-[#171717] border-t hairline-divider flex items-center gap-2"
          >
            <input
              type="text"
              aria-label="Ask the AI engineering assistant"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about failovers, SHAP, tests (or press Enter)..."
              className="flex-1 px-3 py-2 rounded-lg bg-canvas hairline-border focus:border-accent focus:outline-none text-white text-xs font-sans placeholder:text-muted/60"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2 rounded-lg bg-accent text-canvas font-bold disabled:opacity-40 hover:bg-accent/90 transition-all"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
