const CategorySelector = ({ selected, setSelected }) => {
  const categories = ['Vocabulary', 'Grammar', 'Sentences'];
  return (
    <div className="flex gap-4">
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => setSelected(cat)}
          className={`px-4 py-2 rounded ${selected === cat ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;
