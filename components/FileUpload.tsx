
import React, { useState, useCallback } from 'react';
import { UploadIcon } from './icons';

interface FileUploadProps {
  onFileChange: (file: File) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileChange }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel') {
         onFileChange(file);
      } else {
        alert("Please upload a valid Excel file (.xlsx or .xls).");
      }
    }
  };

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  }, [onFileChange]);

  return (
    <div className="w-full max-w-2xl text-center flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">Upload Your Spreadsheet</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Let AI uncover insights from your Excel data and formulas.</p>

        <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`mt-8 w-full p-8 sm:p-12 border-2 border-dashed rounded-xl transition-colors duration-300 ${isDragging ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-300 dark:border-gray-600 hover:border-green-400 dark:hover:border-green-500'}`}
        >
            <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".xlsx, .xls"
                onChange={(e) => handleFileSelect(e.target.files)}
            />
            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center text-gray-500 dark:text-gray-400">
                <UploadIcon className="h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
                <span className="font-semibold text-green-600 dark:text-green-400">Click to upload</span>
                <span className="mt-1">or drag and drop</span>
                <p className="text-xs mt-2 text-gray-400 dark:text-gray-500">Supports: .xlsx, .xls</p>
            </label>
        </div>
    </div>
  );
};
