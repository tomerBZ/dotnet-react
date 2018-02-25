class NameForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { searchTerm: '', repos: [], validationError: false };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.bookmarkRepo = this.bookmarkRepo.bind(this);
    }

    handleChange(event) {
        this.setState({ searchTerm: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.searchTerm === "") {
            this.setState({ validationError: true });
        } else {
            this.setState({ validationError: false });
            axios.get("https://api.github.com/search/repositories?q=" + this.state.searchTerm).then(response => {
                this.setState({ repos: [] });
                response.data.items.map((key, value) => {
                    const temp = this.state.repos.slice()
                    temp.push(key)
                    this.setState({ repos: temp });
                });
            });
        }
    }

    bookmarkRepo(event) {
        event.preventDefault();
        let repo = this.state.repos.find((repo) => {
            return repo.id == event.target.id
        });
        axios.post('Home/Store', { "data": repo }, ).then(response => {
            if (response.data === "success") {
                const temp = this.state.repos.filter((repository) => {
                    return repository.id !== repo.id
                })
                this.setState({ repos: temp });
            }
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} className="mt-5 form-inline col-12">
                    <header className="mb-3">
                        <h1 className="display-3">Search for Github repositories</h1>
                        <span className="bmd-form-group">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={this.state.value} onChange={this.handleChange} />
                            <button className="btn btn-outline-secondery my-2 my-sm-0" type="submit"><i className="material-icons">search</i></button>
                        </span>
                        {this.state.validationError ? <span className="text-danger d-flex flex-column">Please Type in atleast 1 charecter</span> : ''}
                    </header>
                </form>
                <div className="row">
                    {this.state.repos.map((repo, key) => {
                        return (
                            <div className="col-xl-3 mb-3 mt-3" key={repo.id}>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-start align-items-center">
                                            <img className="card-img-top" src={repo.owner.avatar_url} />
                                            <h5 className="card-title">{repo.name}</h5>
                                        </div>
                                        <p className="card-text mt-3">Owner: {repo.owner.login}</p>
                                        <p className="card-text mt-3">Description: {repo.description}</p>
                                        <p className="card-text">Languge: {repo.language}</p>
                                        <div className="d-flex justify-content-between align-items-center card-actions">
                                            <div className="d-flex justify-content-between align-items-center repo-stats pl-0 col-6">
                                                <span><i className="fas fa-star"></i><span className="pl-1">{repo.stargazers_count}</span></span>
                                                <span><i className="fas fa-code-branch"></i><span className="pl-1">{repo.forks}</span></span>
                                                <span><i className="fas fa-eye"></i><span className="pl-1">{repo.watchers}</span></span>
                                            </div>
                                            <button id={repo.id} onClick={this.bookmarkRepo} className="btn btn-raised btn-primary">Bookmark</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <NameForm />,
    document.getElementById('app')
);