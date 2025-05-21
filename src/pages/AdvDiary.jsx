import React, { useState, useEffect } from "react";

const AdvDiary = () => {
  const [form, setForm] = useState({
    matterNumber: "",
    partyName: "",
    date: "",
    time: "",
    ampm: "AM",
    nextDate: "",
    stage: "",
    notes: "",
    file: null,
  });

  const [entries, setEntries] = useState([]);
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  useEffect(() => {
    document.body.style.margin = 0;
    document.body.style.overflow = "hidden";
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEntries((prev) => [...prev, form]);
    alert("Entry added!");
    setForm({
      matterNumber: "",
      partyName: "",
      date: "",
      time: "",
      ampm: "AM",
      nextDate: "",
      stage: "",
      notes: "",
      file: null,
    });
  };

  const isHighlighted = (day) =>
    entries.some((entry) => {
      const date = new Date(entry.date);
      return (
        date.getDate() === day &&
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      );
    });

  const getTooltip = (day) => {
    const match = entries.find((entry) => {
      const date = new Date(entry.date);
      return (
        date.getDate() === day &&
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      );
    });
    return match ? match.partyName : "";
  };

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const handleMonthChange = (e) => setCurrentMonth(parseInt(e.target.value));
  const handleYearChange = (e) => setCurrentYear(parseInt(e.target.value));

  const renderCalendar = () => {
    const days = [];
    const totalDays = daysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    let dayCounter = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDay) || dayCounter > totalDays) {
          week.push(<td key={j}></td>);
        } else {
          const highlight = isHighlighted(dayCounter);
          const tooltip = getTooltip(dayCounter);
          week.push(
            <td
              key={j}
              title={tooltip}
              style={{
                padding: "14px",
                backgroundColor: highlight ? "#fde4b7" : "#fff",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontWeight: highlight ? "bold" : "normal",
                textAlign: "center",
                cursor: tooltip ? "pointer" : "default",
                fontSize: "0.85rem",
              }}
            >
              {dayCounter++}
            </td>
          );
        }
      }
      days.push(<tr key={i}>{week}</tr>);
    }
    return days;
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        padding: "1rem",
        gap: "1rem",
        background: "#f8f9fa",
        fontSize: "0.88rem",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* Entry Form */}
      <div
        style={{
          flex: 1,
          padding: "1rem",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <h1 style={{ marginBottom: "0.3rem", fontSize: "1.3rem" }}>Lawyer's Diary</h1>
        <h2 style={{ color: "#d2691e", marginBottom: "0.8rem", fontSize: "1rem" }}>Add New Entry</h2>
        <form onSubmit={handleSubmit} style={{ flexGrow: 1 }}>
          <input type="text" name="matterNumber" placeholder="Matter Number" value={form.matterNumber} onChange={handleChange} style={cleanInputStyle} />
          <input type="text" name="partyName" placeholder="Party Name" value={form.partyName} onChange={handleChange} style={cleanInputStyle} />
          <input type="date" name="date" value={form.date} onChange={handleChange} style={cleanInputStyle} />
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.8rem" }}>
            <input type="time" name="time" value={form.time} onChange={handleChange} style={{ ...cleanInputStyle, flex: 1 }} />
            <select name="ampm" value={form.ampm} onChange={handleChange} style={{ ...cleanInputStyle, flex: 0.5 }}>
              <option>AM</option>
              <option>PM</option>
            </select>
          </div>
          <input type="date" name="nextDate" value={form.nextDate} onChange={handleChange} style={cleanInputStyle} />
          <input type="text" name="stage" placeholder="Select Stage" value={form.stage} onChange={handleChange} style={cleanInputStyle} />
          <textarea name="notes" placeholder="Additional Notes" value={form.notes} onChange={handleChange} style={{ ...cleanInputStyle, height: "70px", resize: "none" }} />
          <input type="file" name="file" onChange={handleChange} style={{ marginBottom: "0.8rem" }} />
          <button type="submit" style={submitButtonStyle}>Add Entry</button>
        </form>
      </div>

      {/* Calendar */}
      <div
        style={{
          flex: 1.5,
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
          <h2 style={{ color: "#d2691e", fontSize: "1rem" }}>Calendar</h2>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <select value={currentMonth} onChange={handleMonthChange} style={{ ...cleanInputStyle, padding: "0.4rem" }}>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                  {new Date(0, i).toLocaleString("default", { month: "short" })}
                </option>
              ))}
            </select>
            <select value={currentYear} onChange={handleYearChange} style={{ ...cleanInputStyle, padding: "0.4rem" }}>
              {Array.from({ length: 20 }, (_, i) => {
                const year = new Date().getFullYear() - 10 + i;
                return <option key={year} value={year}>{year}</option>;
              })}
            </select>
          </div>
        </div>

        <div style={{ flexGrow: 1 }}>
          <table
            style={{
              width: "100%",
              height: "85%",
              borderCollapse: "collapse",
              tableLayout: "fixed",
              fontSize: "0.85rem",
            }}
          >
            <thead>
              <tr>
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <th
                    key={day}
                    style={{
                      padding: "8px",
                      backgroundColor: "#ffefe0",
                      border: "1px solid #f0c99c",
                      fontWeight: "600",
                    }}
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>{renderCalendar()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Clean input style (no borders, modern)
const cleanInputStyle = {
  width: "100%",
  padding: "0.45rem 0.5rem",
  marginBottom: "0.7rem",
  border: "none",
  borderBottom: "1px solid #ccc",
  backgroundColor: "#fdfdfd",
  fontSize: "1rem",
};

const submitButtonStyle = {
  background: "#d2691e",
  color: "#fff",
  padding: "0.45rem 1rem",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "0.88rem",
  fontWeight: "bold",
  marginTop: "1.5 rem",
};

export default AdvDiary;
