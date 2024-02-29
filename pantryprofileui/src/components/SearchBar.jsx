const SearchBar = ({
    value,
    isLoading,
    handleSubmit,
    onChange
}) => {
    return (
        <form onSubmit={handleSubmit}>
            <input
                value={value}
                disabled={isLoading}
                onChange={onChange}

                placeholder="Search Recipe"
                className="form-control"
            />
            <input 
                disable={isLoading || value}
                type="submit" 
                className="btn"
                value="Search"
                />
        </form>
    )
};
export default SearchBar;
