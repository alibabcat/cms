import React from 'react';
import { Mail } from 'lucide-react';
import type { NewsletterSectionContent } from '@/types';

interface NewsletterSectionProps {
  data: NewsletterSectionContent;
}

const NewsletterSection: React.FC<NewsletterSectionProps> = ({ data }) => {
  return (
    <section className="bg-gradient-to-r from-primary-600 via-primary-500 to-amber-400 py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 border border-white/20 shadow-xl">
            <div className="text-center lg:text-start flex-1">
                <h2 className="text-3xl font-black text-black mb-4">
                    {data.heading}
                </h2>
                {data.subheading && (
                  <p className="text-gray-900 text-lg font-medium">
                      {data.subheading}
                  </p>
                )}
            </div>

            <div className="w-full lg:w-auto flex-1 max-w-md">
                <form className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                            type="email"
                            className="block w-full ps-10 pe-3 py-4 border-0 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black shadow-lg bg-white"
                            placeholder={data.inputPlaceholder}
                        />
                    </div>
                    {data.buttonLabel && (
                      <button
                          type="submit"
                          className="inline-flex justify-center items-center px-6 py-4 border border-transparent text-base font-bold rounded-xl text-white bg-black hover:bg-gray-800 focus:outline-none shadow-lg transition-transform active:scale-95"
                      >
                          {data.buttonLabel}
                      </button>
                    )}
                </form>
                {data.disclaimer && (
                  <p className="text-xs text-black/70 mt-3 text-center lg:text-start font-medium">
                      {data.disclaimer}
                  </p>
                )}
            </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
