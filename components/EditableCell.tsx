import React, { useState, useEffect } from 'react';

interface EditableCellProps {
  value: number;
  onChange: (value: number) => void;
}

export const EditableCell: React.FC<EditableCellProps> = ({ value, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value.toString());

  useEffect(() => {
    setCurrentValue(value.toString());
  }, [value]);

  const handleBlur = () => {
    setIsEditing(false);
    const numericValue = parseFloat(currentValue);
    if (!isNaN(numericValue) && numericValue !== value) {
      onChange(numericValue);
    } else {
       // Reset to original value if input is invalid
       setCurrentValue(value.toString());
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    } else if (e.key === 'Escape') {
      setCurrentValue(value.toString());
      setIsEditing(false);
    }
  };

  return (
    <td
      className="p-0 text-center cursor-pointer"
      onClick={() => setIsEditing(true)}
    >
      {isEditing ? (
        <input
          type="number"
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
          className="w-full h-full p-2 text-center bg-amber-100 dark:bg-amber-800/50 text-slate-900 dark:text-white border-2 border-green-500 rounded-md outline-none text-base"
        />
      ) : (
        <div className="p-2 h-full w-full text-slate-600 dark:text-slate-400 font-medium text-base">
            {value}
        </div>
      )}
    </td>
  );
};