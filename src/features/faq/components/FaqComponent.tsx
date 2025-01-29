import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Learning from "@core/assets/learning-assets.jpg";

interface FAQItem {
  question: string;
  answer: string;
}

const FaqComponent = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData: FAQItem[] = [
    {
      question: "How long should a business plan be?",
      answer:
        "Nullam faucibus eleifend mi eu varius. Integer vel tincidunt massa, quis semper odio. Mauris et mollis quam. Nullam fringilla erat id ante commodo sodales. In maximus ultrices euismod. Vivamus porta justo ex.",
    },
    {
      question: "What is included in your services?",
      answer:
        "Our services include comprehensive business planning, strategy development, market analysis, and implementation support. We work closely with clients to ensure their success.",
    },
    {
      question: "What type of company is measured?",
      answer:
        "We measure various types of companies including startups, small-to-medium enterprises, and established corporations across different industries and sectors.",
    },
    {
      question: "What type of company is measured?",
      answer:
        "We analyze companies across all sectors including technology, retail, manufacturing, services, and more to provide comprehensive measurement metrics.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40">
      <div className="flex flex-col md:flex-row gap-12 items-start">
        <div className="w-full md:w-1/2 md:sticky md:top-6">
          <img
            src={Learning}
            alt="Students with documents"
            className="w-full h-auto rounded-lg shadow-lg object-cover"
          />
        </div>
        <div className="w-full md:w-1/2">
          <div className="mb-8">
            <div className="text-purple-600 font-medium mb-2">
              ASK QUESTIONS
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className={`border rounded-xl overflow-hidden hover:border-orange-600 ${
                  openIndex === index ? "border-orange-600" : "border-gray-400"
                }`}
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }>
                <button
                  className={`w-full text-left p-4 flex justify-between items-center hover:bg-orange-50 ${
                    openIndex === index ? "bg-orange-50" : "bg-white"
                  }`}>
                  <span className="font-medium text-gray-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                      openIndex === index
                        ? "transform rotate-180"
                        : "transform rotate-0"
                    }`}
                  />
                </button>
                <div
                  className={`transition-all duration-200 ease-in-out ${
                    openIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  } overflow-hidden`}>
                  <div className="p-4 bg-white text-gray-600">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqComponent;
