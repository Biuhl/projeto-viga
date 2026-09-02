"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("loading");

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus("success");
      formRef.current.reset();
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
      setStatus("error");
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-7">
      <div>
        <label htmlFor="user_name" className="block text-sm text-slate-500 mb-1.5">
          Nome
        </label>
        <input
          id="user_name"
          type="text"
          name="user_name"
          required
          placeholder="Seu nome completo"
          className="w-full bg-transparent border-0 border-b border-slate-300 focus:border-blue-600 outline-none transition-colors py-2.5 text-slate-900 placeholder:text-slate-400 rounded-none"
        />
      </div>

      <div>
        <label htmlFor="user_email" className="block text-sm text-slate-500 mb-1.5">
          E-mail
        </label>
        <input
          id="user_email"
          type="email"
          name="user_email"
          required
          placeholder="seuemail@exemplo.com"
          className="w-full bg-transparent border-0 border-b border-slate-300 focus:border-blue-600 outline-none transition-colors py-2.5 text-slate-900 placeholder:text-slate-400 rounded-none"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-slate-500 mb-1.5">
          Mensagem
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          required
          placeholder="Escreva sua mensagem..."
          className="w-full bg-transparent border-0 border-b border-slate-300 focus:border-blue-600 outline-none transition-colors py-2.5 text-slate-900 placeholder:text-slate-400 rounded-none resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-4 bg-[#080B10] hover:bg-blue-600 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Enviando..." : "Enviar mensagem"}
      </button>

      {status === "success" && (
        <p className="pl-3 border-l-2 border-emerald-500 text-emerald-700 text-sm">
          Mensagem enviada com sucesso!
        </p>
      )}

      {status === "error" && (
        <p className="pl-3 border-l-2 border-red-500 text-red-700 text-sm">
          Erro ao enviar. Tente novamente em instantes.
        </p>
      )}
    </form>
  );
}