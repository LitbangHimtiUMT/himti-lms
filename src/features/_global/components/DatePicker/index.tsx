import React, { useState, useRef, useEffect } from "react";
import { format } from "date-fns";

type DatePickerMode = "date" | "month" | "year";
type DateRange = [Date | null, Date | null];

interface DatePickerProps {
  mode?: DatePickerMode;
  range?: boolean;
  onChange?: (date: Date | DateRange) => void;
  initialStartDate?: Date;
  initialEndDate?: Date;
  className?: string;
  placeholder?: string;
  displayFormat?: string;
  width?: string;
  fullWidth?: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  mode = "date",
  range = false,
  onChange,
  initialStartDate,
  initialEndDate,
  className = "",
  placeholder = "Select date",
  displayFormat = "MMM dd, yyyy",
  width = "100%",
  fullWidth = true,
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<DatePickerMode>(mode);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(
    initialStartDate || null
  );
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(
    initialEndDate || null
  );
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [triggerWidth, setTriggerWidth] = useState(0);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Generate years from 1900 to 2100
  const years = Array.from({ length: 201 }, (_, i) => 1900 + i);

  // Close dropdown when clicking outside and measure trigger width
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const measureTrigger = () => {
      if (triggerRef.current) {
        setTriggerWidth(
          fullWidth
            ? triggerRef.current.offsetWidth
            : triggerRef.current.offsetWidth / 2
        );
      }
    };

    measureTrigger();
    window.addEventListener("resize", measureTrigger);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", measureTrigger);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigatePeriod = (direction: number) => {
    const newDate = new Date(currentDate);

    switch (viewMode) {
      case "date":
        newDate.setMonth(newDate.getMonth() + direction);
        break;
      case "month":
        newDate.setFullYear(newDate.getFullYear() + direction);
        break;
      case "year":
        newDate.setFullYear(newDate.getFullYear() + direction * 10);
        break;
    }

    setCurrentDate(newDate);
  };

  const selectDate = (day: number) => {
    const newDate = new Date(Date.UTC(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    ));

    if (range) {
      if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
        setSelectedStartDate(newDate);
        setSelectedEndDate(null);
        if (onChange) onChange([newDate, null]);
      } else if (newDate > selectedStartDate) {
        setSelectedEndDate(newDate);
        if (onChange) onChange([selectedStartDate, newDate]);
      } else {
        setSelectedEndDate(selectedStartDate);
        setSelectedStartDate(newDate);
        if (onChange) onChange([newDate, selectedStartDate]);
      }
    } else {
      setSelectedStartDate(newDate);
      if (onChange) onChange(newDate);
      setIsOpen(false);
    }
  };

  const selectMonth = (month: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(month);
    setCurrentDate(newDate);
    setViewMode("date");
  };

  const selectYear = (year: number) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(year);
    setCurrentDate(newDate);
    setViewMode("month");
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const isDateSelected = (day: number): boolean => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );

    if (!range) {
      return (
        selectedStartDate !== null &&
        date.getDate() === selectedStartDate.getDate() &&
        date.getMonth() === selectedStartDate.getMonth() &&
        date.getFullYear() === selectedStartDate.getFullYear()
      );
    } else {
      if (!selectedStartDate) return false;
      if (!selectedEndDate) {
        return (
          date.getDate() === selectedStartDate.getDate() &&
          date.getMonth() === selectedStartDate.getMonth() &&
          date.getFullYear() === selectedStartDate.getFullYear()
        );
      }

      return date >= selectedStartDate && date <= selectedEndDate;
    }
  };

  const isDateInRange = (day: number): boolean => {
    if (!range || !selectedStartDate || !hoverDate || selectedEndDate)
      return false;

    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    const start = selectedStartDate < hoverDate ? selectedStartDate : hoverDate;
    const end = selectedStartDate < hoverDate ? hoverDate : selectedStartDate;

    return date > start && date < end;
  };

  const isSameMonth = (date1: Date | null, date2: Date | null): boolean => {
    if (!date1 || !date2) return false;
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth()
    );
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(
      currentDate.getFullYear(),
      currentDate.getMonth()
    );
    const firstDayOfMonth = getFirstDayOfMonth(
      currentDate.getFullYear(),
      currentDate.getMonth()
    );
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = isDateSelected(day);
      const isInRange = isDateInRange(day);
      const isToday =
        new Date().getDate() === day &&
        new Date().getMonth() === currentDate.getMonth() &&
        new Date().getFullYear() === currentDate.getFullYear();

      days.push(
        <button
          type="button"
          key={`day-${day}`}
          className={`h-8 w-8 rounded-lg flex items-center justify-center text-sm
            ${isToday ? "font-bold border border-blue-500" : ""}
            ${isSelected ? "bg-blue-500 text-white" : ""}
            ${isInRange ? "bg-blue-100" : ""}
            hover:bg-blue-100 transition-colors duration-200`}
          onClick={() => selectDate(day)}
          onMouseEnter={() =>
            range &&
            !selectedEndDate &&
            setHoverDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
            )
          }
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const renderMonths = () => {
    return months.map((month, index) => {
      const isCurrentMonth = currentDate.getMonth() === index;
      const isSelectedMonth =
        selectedStartDate &&
        selectedStartDate.getMonth() === index &&
        isSameMonth(currentDate, selectedStartDate);

      return (
        <button
          key={month}
          className={`py-2 rounded-md text-sm
            ${isCurrentMonth ? "font-semibold" : ""}
            ${isSelectedMonth ? "bg-blue-500 text-white" : "hover:bg-gray-100"}
            transition-colors duration-200`}
          onClick={() => selectMonth(index)}
        >
          {month.substring(0, 3)}
        </button>
      );
    });
  };

  const renderYears = () => {
    const currentYear = currentDate.getFullYear();
    const startYear = Math.floor(currentYear / 10) * 10;
    const displayedYears = years.slice(
      years.indexOf(startYear),
      years.indexOf(startYear) + 10
    );

    return displayedYears.map((year) => {
      const isCurrentYear = currentDate.getFullYear() === year;
      const isSelectedYear =
        selectedStartDate &&
        selectedStartDate.getFullYear() === year &&
        currentDate.getFullYear() === year;

      return (
        <button
          type="button"
          key={year}
          className={`py-2 rounded-md text-sm
            ${isCurrentYear ? "font-semibold" : ""}
            ${isSelectedYear ? "bg-blue-500 text-white" : "hover:bg-gray-100"}
            transition-colors duration-200`}
          onClick={() => selectYear(year)}
        >
          {year}
        </button>
      );
    });
  };

  const formatHeaderDisplay = (): string => {
    const startYear = Math.floor(currentDate.getFullYear() / 10) * 10;
    switch (viewMode) {
      case "date":
        return `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
      case "month":
        return `${currentDate.getFullYear()}`;
      case "year":
        return `${startYear}-${startYear + 9}`;
      default:
        return "";
    }
  };

  const toggleViewMode = () => {
    const nextMode: Record<DatePickerMode, DatePickerMode> = {
      date: "month",
      month: "year",
      year: "date",
    };
    setViewMode(nextMode[viewMode]);
  };

  const formatDisplayDate = (): string => {
    if (range) {
      if (!selectedStartDate) return placeholder;
      if (!selectedEndDate) return format(selectedStartDate, displayFormat);
      return `${format(selectedStartDate, displayFormat)} - ${format(
        selectedEndDate,
        displayFormat
      )}`;
    } else {
      return selectedStartDate
        ? format(selectedStartDate, displayFormat)
        : placeholder;
    }
  };

  return (
    <div
      className={`relative ${className}`}
      ref={datePickerRef}
      style={{ width }}
    >
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-2 border rounded-md shadow-sm text-left text-sm
          ${
            isOpen
              ? "ring-2 ring-blue-500 border-blue-500"
              : "border-gray-300 hover:border-gray-400"
          }
          focus:outline-none focus:ring-2 focus:ring-blue-500`}
      >
        <span className={`${!selectedStartDate ? "text-gray-400" : ""}`}>
          {formatDisplayDate()}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown Picker */}
      {isOpen && (
        <div
          className="absolute z-10 mt-1 bg-white rounded-lg shadow-lg p-4 border border-gray-200"
          style={{ width: triggerWidth }}
        >
          {/* Header with navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => navigatePeriod(-1)}
              className="p-1 rounded-md hover:bg-gray-100 transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={toggleViewMode}
              className="font-semibold text-sm px-2 py-1 rounded-md hover:bg-gray-100 transition-colors duration-200"
            >
              {formatHeaderDisplay()}
            </button>

            <button
              type="button"
              onClick={() => navigatePeriod(1)}
              className="p-1 rounded-md hover:bg-gray-100 transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Body content based on view mode */}
          <div className="mb-2">
            {viewMode === "date" && (
              <>
                {/* Weekday headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {weekdays.map((day) => (
                    <div
                      key={day}
                      className="text-xs text-center text-gray-500 font-medium"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Days grid */}
                <div className="grid grid-cols-7 gap-1">{renderDays()}</div>
              </>
            )}

            {viewMode === "month" && (
              <div className="grid grid-cols-3 gap-2">{renderMonths()}</div>
            )}

            {viewMode === "year" && (
              <div className="grid grid-cols-5 gap-2">{renderYears()}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
