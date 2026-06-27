import { useState } from "react"
import "./App.css"

// A small list of sidebar items.
const navItems = [
  { id: "home", label: "Home", icon: "home" },
  { id: "goals", label: "Goals", icon: "track_changes" },
  { id: "daily", label: "Daily", icon: "event_note" },
  { id: "settings", label: "Settings", icon: "settings" },
]

// Daily has two smaller tabs inside it: To-do and Reminders.
const dailyTabs = [
  { id: "todo", label: "To-do" },
  { id: "reminders", label: "Reminders" },
]

function App() {
  // useState stores values that can change over time.
  // Here, activeView controls which screen is shown.
  const [activeView, setActiveView] = useState("home")
  const [dailySubtab, setDailySubtab] = useState("todo")

  // This function decides what content to show on the main panel.
  const renderScreen = () => {
    if (activeView === "goals") {
      return (
        <div className="screen-card">
          <p className="eyebrow">Focus mode</p>
          <h2>Growth goals</h2>
          <p>Track your next milestones and keep your momentum visible.</p>
          <div className="card-grid">
            <div className="info-card">
              <strong>Read 20 pages</strong>
              <span>Daily habit</span>
            </div>
            <div className="info-card">
              <strong>Workout 4x</strong>
              <span>This week</span>
            </div>
            <div className="info-card">
              <strong>Launch portfolio</strong>
              <span>Next month</span>
            </div>
          </div>
        </div>
      )
    }

    if (activeView === "daily") {
      return (
        <div className="screen-card">
          <p className="eyebrow">Today</p>
          <h2>{dailySubtab === "todo" ? "To-do list" : "Reminders"}</h2>
          <p>
            {dailySubtab === "todo"
              ? "Keep the day lightweight and intentional."
              : "Stay on top of what matters most."}
          </p>

          <div className="daily-tabs">
            {dailyTabs.map((tab) => (
              <button
                key={tab.id}
                className={`pill ${dailySubtab === tab.id ? "active" : ""}`}
                onClick={() => setDailySubtab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="card-grid">
            {dailySubtab === "todo" ? (
              <>
                <div className="info-card">
                  <strong>Plan your morning</strong>
                  <span>10:00 AM</span>
                </div>
                <div className="info-card">
                  <strong>Practice coding</strong>
                  <span>1 hour</span>
                </div>
              </>
            ) : (
              <>
                <div className="info-card">
                  <strong>Send update to mentor</strong>
                  <span>4:30 PM</span>
                </div>
                <div className="info-card">
                  <strong>Review weekly goals</strong>
                  <span>8:00 PM</span>
                </div>
              </>
            )}
          </div>
        </div>
      )
    }

    if (activeView === "settings") {
      return (
        <div className="screen-card">
          <p className="eyebrow">Preferences</p>
          <h2>Settings</h2>
          <p>Shape your workspace to feel calm and focused.</p>
          <div className="settings-list">
            <div className="setting-row">
              <span>Dark mode</span>
              <button className="toggle">On</button>
            </div>
            <div className="setting-row">
              <span>Reminder sounds</span>
              <button className="toggle">On</button>
            </div>
            <div className="setting-row">
              <span>Focus timer</span>
              <button className="toggle">25 min</button>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="screen-card">
        <p className="eyebrow">Welcome back</p>
        <h2>Your growth dashboard</h2>
        <p>Stay focused, build your rhythm, and keep moving forward.</p>
        <div className="card-grid">
          <div className="info-card">
            <strong>3 habits active</strong>
            <span>Consistency is rising</span>
          </div>
          <div className="info-card">
            <strong>2 goals ahead</strong>
            <span>On track this week</span>
          </div>
          <div className="info-card">
            <strong>1 reminder set</strong>
            <span>Ready for today</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <div className="brand">
            <div className="brand-mark">
              <span className="material-symbols-rounded">auto_awesome</span>
            </div>
            <div>
              <h1>MyGrowth</h1>
              <p>Intentional living</p>
            </div>
          </div>

          <nav className="nav-list">
            {navItems.map((item) => (
              <div key={item.id}>
                <button
                  className={`nav-item ${activeView === item.id ? "active" : ""}`}
                  onClick={() => {
                    // Clicking a button updates the state.
                    // React re-renders the page with the new content.
                    setActiveView(item.id)
                    if (item.id !== "daily") {
                      setDailySubtab("todo")
                    }
                  }}
                >
                  <span className="material-symbols-rounded nav-icon">
                    {item.icon}
                  </span>
                  {item.label}
                </button>

                {/* Show the smaller Daily tabs only when Daily is selected. */}
                {item.id === "daily" && activeView === "daily" && (
                  <div className="subnav">
                    {dailyTabs.map((tab) => (
                      <button
                        key={tab.id}
                        className={`subnav-item ${dailySubtab === tab.id ? "active" : ""}`}
                        onClick={() => setDailySubtab(tab.id)}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="sidebar-footer">
          <p>Progress, one day at a time.</p>
        </div>
      </aside>

      <main className="main-panel">{renderScreen()}</main>
    </div>
  )
}

export default App
