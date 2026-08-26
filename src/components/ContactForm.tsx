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
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="bg-white text-gray-900 p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-200 space-y-4 max-w-xl mx-auto"
    >
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider mb-1">
          Nome
        </label>
        <input
          type="text"
          name="user_name"
          required
          placeholder="Seu nome completo"
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition text-sm"
        />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider mb-1">
          E-mail
        </label>
        <input
          type="email"
          name="user_email"
          required
          placeholder="seuemail@exemplo.com"
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition text-sm"
        />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider mb-1">
          Mensagem
        </label>
        <textarea
          name="message"
          rows={4}
          required
          placeholder="Escreva sua mensagem..."
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
      >
        {status === "loading" ? "Enviando..." : "Enviar mensagem"}
      </button>

      {status === "success" && (
        <p className="p-3 bg-green-50 border border-green-200 text-green-800 text-xs font-semibold rounded-md text-center">
          Mensagem enviada com sucesso!
        </p>
      )}

      {status === "error" && (
        <p className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs font-semibold rounded-md text-center">
          Erro ao enviar. Tente novamente em instantes.
        </p>
      )}
    </form>
  );
}