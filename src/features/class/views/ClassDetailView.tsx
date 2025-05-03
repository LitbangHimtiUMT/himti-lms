import Learning from "@core/assets/learning-assets.jpg";
import { Poppins } from "../../_global/components/Text";
import { Button } from "../../_global/components/Button";

export const ClassDetailView = () => {
  return (
    <div className="mt-0 font-sans text-gray-800">
      {/* Header Section */}
      <div className="relative h-[400px]">
        <img src={Learning} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center">
          <Poppins className="text-white text-5xl font-bold">
            Course Details
          </Poppins>
          <p className="text-white mt-4">Class &gt; Course Details</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Video Preview */}
          <div className="aspect-video bg-gray-200 rounded overflow-hidden">
            <img src={Learning} className="w-full h-full object-cover" />
          </div>

          {/* Course Info */}
          <div>
            <h2 className="text-3xl font-semibold mb-2">
              The Complete Graphic Design for Beginners
            </h2>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>👩‍🏫 Jane Cooper</span>
              <span>📚 Online Teaching</span>
              <span>⭐ 4.8</span>
            </div>
          </div>

          {/* Tabs (for now static layout) */}
          <div className="flex gap-4 mt-6">
            <Button variant="primary">Overview</Button>
            <Button variant="secondary">Curriculum</Button>
            <Button variant="secondary">Instructor</Button>
            <Button variant="secondary">Reviews</Button>
          </div>

          {/* Course Curriculum */}
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Course Curriculum</h3>
            <div className="space-y-6">
              <div>
                <p className="font-semibold">Subjects/Courses</p>
                <ul className="mt-2 space-y-2">
                  <li>📘 Lesson 1: Introduction</li>
                  <li>📘 Lesson 2: Basic Tool</li>
                  <li>📘 Lesson 3: Images Optimizes</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Advanced Topic</p>
                <ul className="mt-2 space-y-2">
                  <li>📗 Lesson 4: Color Selection</li>
                  <li>📗 Lesson 5: Typography</li>
                  <li>📗 Lesson 6: Template Design</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Review Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-semibold mb-4">Write a Review</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input placeholder="Your Name" className="border p-3 rounded" />
              <input placeholder="Your Email" className="border p-3 rounded" />
            </div>
            <textarea
              rows={4}
              placeholder="Your Message"
              className="border mt-4 p-3 w-full rounded"></textarea>
            <Button className="mt-4">Post Review</Button>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-1">
          <div className="sticky top-6">
            <div className="space-y-6 border p-6 rounded-lg shadow-md bg-white">
              <div>
                <p className="text-sm text-gray-600">Level:</p>
                <p className="font-semibold">Beginner</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Duration:</p>
                <p className="font-semibold">6 Months</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Lessons:</p>
                <p className="font-semibold">12</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Students:</p>
                <p className="font-semibold">120</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Certifications:</p>
                <p className="font-semibold">Yes</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Language:</p>
                <p className="font-semibold">English</p>
              </div>
              <Button className="w-full">Add to Cart</Button>
              <Button variant="primary" className="w-full">
                Join this Course
              </Button>
              <div className="flex gap-4 mt-4 items-center">
                <p className="text-sm text-gray-600">Share:</p>
                <span>🔗</span>
                <span>🐦</span>
                <span>📘</span>
                <span>💼</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Optional Footer */}
      {/* <div className="bg-gray-900 text-white py-12 mt-20 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Edutics. All rights reserved.
        </p>
      </div> */}
    </div>
  );
};
