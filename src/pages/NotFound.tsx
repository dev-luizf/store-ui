import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
            <span className="sr-only">Error</span>
            404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Desculpe, nós não conseguimos encontrar esta página.
          </p>
          <p className="mt-4 mb-8 dark:text-gray-400">
            Mas não se preocupe, você pode encontrar muitas outras coisas em nossa página inicial.
          </p>
          <Link
            rel="noopener noreferrer"
            to="/"
            className="px-8 py-3 font-semibold rounded bg-violet-400 text-white"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </section>
  );
}
