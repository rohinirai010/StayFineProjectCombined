import React from "react";
import { UserPlusIcon, PuzzlePieceIcon, DocumentPlusIcon, FilmIcon } from "@heroicons/react/24/outline";

const QuickActionButtons = () => {
  // Quick action buttons data
  const actions = [
    {
      id: 1,
      title: "New Client",
      description: "Add client with package",
      icon: <UserPlusIcon className="h-4 sm:h-6 w-4 sm:w-6" />,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300",
      link: "/clients/new"
    },
    {
      id: 2,
      title: "Test Project",
      description: "Create demo instantly",
      icon: <PuzzlePieceIcon className="h-4 sm:h-6 w-4 sm:w-6" />,
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300",
      link: "/projects/test"
    },
    {
      id: 3,
      title: "Add PDF Theme",
      description: "Upload template design",
      icon: <DocumentPlusIcon className="h-4 sm:h-6 w-4 sm:w-6" />,
      color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300",
      link: "/pdfs/themes/new"
    },
    {
      id: 4,
      title: "Add Video Theme",
      description: "Setup TTS/video structure",
      icon: <FilmIcon className="h-4 sm:h-6 w-4 sm:w-6" />,
      color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300",
      link: "/videos/themes/new"
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="p-3 sm:p-4">
        <h2 className="text-[16px] sm:text-lg font-medium text-gray-700 dark:text-gray-200 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {actions.map((action) => (
            <a
              key={action.id}
              href={action.link}
              className="flex items-center p-[6px] sm:p-2 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 transition-colors"
            >
              <div className={`${action.color} p-[6px] sm:p-3 rounded-lg`}>
                {action.icon}
              </div>
              <div className="ml-3">
                <h3 className="text-[13px] sm:text-sm font-medium text-gray-800 dark:text-white">{action.title}</h3>
                <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">{action.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActionButtons;