import React from 'react';
import { FiClipboard } from 'react-icons/fi';
import { formatTime } from '../../../../_global/lib/format-time';
import { Submission, SubmissionStatus } from './DetailModuleContent';

interface TableHistorySubmissionProps {
    submissions: Submission[]   
}

const getStatusBadge = (status: SubmissionStatus) => {
    const statusClasses = {
      REVIEW: 'bg-green-100 dark:bg-green-700 text-green-800 dark:text-green-200',
      REJECT: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
      APPROVE: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    };
    
    const statusText:Record<SubmissionStatus, string> = {
      REVIEW: 'Review',
      APPROVE: 'Approve',
      REJECT: 'Reject',
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status]}`}>
        {statusText[status]}
      </span>
    );
  };

export const TableHistorySubmission: React.FC<TableHistorySubmissionProps> = ({submissions}) => {
  return (
    <>
     {/* Submission History Table */}
     <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
              <FiClipboard className='text-gray-600' />
                Submission History
              </h3>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Submission
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Files
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Submitted At
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Feedback
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {submissions.length > 0 ? (
                      submissions.map((submission) => (
                        <tr
                          key={submission.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {submission.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex flex-col gap-1">
                            <a
                                  href={submission.files.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                                >
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                    />
                                  </svg>
                                  {submission.files.name} (
                                  {(submission.files.size / 1024 / 1024).toFixed(2)} MB)
                                </a>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {getStatusBadge(submission.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {formatTime(submission.submittedAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {submission.feedback || '-'}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                        >
                          No submission history found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
    </>
  )
}
