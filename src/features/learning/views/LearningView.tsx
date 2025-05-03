import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle, Play, Menu } from "lucide-react";

// Data statis
const courseModules = [
  {
    title: "Warming Up",
    count: 3,
    unit: "videos",
    duration: "8 menit",
    isOpen: true,
    lessons: [
      {
        title: "Apa Yang Mau Kita Buat",
        duration: "2 menit",
        isCompleted: false,
      },
      {
        title: "Memulai dengan Setup Project",
        duration: "4 menit",
        isCompleted: false,
      },
      {
        title: "Manfaatkan Gin Framework",
        duration: "2 menit",
        isCompleted: true,
      },
    ],
  },
  {
    title: "Membuat API Stasiun",
    count: 5,
    unit: "videos",
    duration: "24 menit",
    isOpen: false,
    lessons: [],
  },
  {
    title: "Membuat API Schedule",
    count: 4,
    unit: "videos",
    duration: "24 menit",
    isOpen: false,
    lessons: [],
  },
  {
    title: "Challenge dan Closing",
    count: 1,
    unit: "video",
    duration: "1 menit",
    isOpen: false,
    lessons: [],
  },
];

export const LearningDashboardView = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [modules, setModules] = useState(courseModules);

  // Toggle module open/close
  const toggleModule = (index: number) => {
    const updatedModules = [...modules];
    updatedModules[index].isOpen = !updatedModules[index].isOpen;
    setModules(updatedModules);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`flex h-screen w-full ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}>
      {/* Header */}
      {/* <div className="fixed top-0 left-0 right-0 h-14 bg-white shadow-sm flex items-center justify-between px-4 z-10">
        <div className="flex items-center gap-4">
          <div className="bg-blue-500 rounded-full p-2">
            <span className="text-white font-bold">M</span>
          </div>
          <ArrowLeft className="text-gray-500" size={20} />
          <span className="font-medium">My Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <Search className="text-gray-500" size={20} />
          <Bell className="text-gray-500" size={20} />
          <span className="text-sm">Halo, Ridwan Febnur Asri Redinda</span>
          <div className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center">
            <span className="text-white font-bold">R</span>
          </div>
        </div>
      </div> */}

      {/* Sidebar */}
      <div
        className={`fixed top-24 left-0 bottom-0 w-64 ${
          darkMode ? "bg-gray-800" : "bg-white"
        } shadow-md`}>
        <div className="p-4 flex items-center justify-between">
          <Menu size={24} className="text-gray-500" />
        </div>

        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <span className="font-medium">Dark Mode</span>
            <div
              className={`w-12 h-6 rounded-full p-1 cursor-pointer ${
                darkMode ? "bg-blue-500" : "bg-gray-300"
              }`}
              onClick={toggleDarkMode}>
              <div
                className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                  darkMode ? "translate-x-6" : ""
                }`}
              />
            </div>
          </div>
        </div>

        {/* Course Modules */}
        <div className="overflow-y-auto h-full pb-20">
          {modules.map((module, index) => (
            <div
              key={index}
              className={`border-b ${
                darkMode ? "border-gray-700" : "border-gray-200"
              }`}>
              <div
                className="p-4 flex items-start justify-between cursor-pointer"
                onClick={() => toggleModule(index)}>
                <div>
                  <h3 className="font-medium">{module.title}</h3>
                  <p className="text-sm text-gray-500">
                    {module.count} {module.unit} ({module.duration})
                  </p>
                </div>
                {module.isOpen ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </div>

              {module.isOpen && module.lessons && (
                <div className="pl-4 pr-2 pb-2">
                  {module.lessons.map((lesson, i) => (
                    <div
                      key={i}
                      className={`p-2 rounded-lg mb-2 flex items-center ${
                        lesson.isCompleted ? "bg-gray-100" : "hover:bg-gray-50"
                      } ${darkMode ? "hover:bg-gray-700 bg-gray-700" : ""}`}>
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        {lesson.isCompleted ? (
                          <CheckCircle className="text-green-500" size={16} />
                        ) : (
                          <Play className="text-gray-500" size={16} />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{lesson.title}</h4>
                        <p className="text-xs text-gray-500">
                          {lesson.duration}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 mt-14 flex-1 flex flex-col">
        {/* YouTube Video Player */}
        <div
          className="relative w-full bg-black"
          style={{ paddingTop: "56.25%" }}>
          <div className="absolute inset-0">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/SpMIs6AnUW8?autoplay=0"
              title="Series Golang Mini Project | 3. Manfaatkan Gin Framework"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen></iframe>
          </div>
        </div>

        {/* Course Info */}
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">Manfaatkan Gin Framework</h1>
          <p className="text-gray-500">Materi bagian: Warming Up</p>

          <div className="mt-8 flex justify-end">
            <button className="bg-blue-600 text-white px-8 py-2 rounded-md">
              Complete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
