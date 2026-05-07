function DarkModeToggle({ darkMode, onToggle }) {
  return (
    <button 
      onClick={onToggle}
      data-testid="dark-mode-toggle"
    >
      {darkMode ? 'Toggle Light Mode' : 'Toggle Dark Mode'}
    </button>
  );
}

export default DarkModeToggle;