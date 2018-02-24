class NameForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { bookmarks: [] };
        this.loadBookmarks = this.loadBookmarks.bind(this);
        this.resetBookmarks = this.resetBookmarks.bind(this);
    }

    loadBookmarks() {
        axios.get("/Bookmarks/Get").then(response => {
            this.setState({ bookmarks: [] });
            response.data.map((value, key) => {
                const temp = this.state.bookmarks.slice()
                temp.push(value)
                this.setState({ bookmarks: temp });
            });
            console.log(this.state.bookmarks);
        });
    }


    resetBookmarks() {
        axios.post("/Bookmarks/Reset").then(response => {
            if (response.data === "success") {
                this.setState({ bookmarks: [] });
            }
        });
    }

    componentDidMount() {
        this.loadBookmarks();
    }

    render() {
        return (
            <div className="row">
                {this.state.bookmarks.length ? (
                    <div className="col-12 mt-5">
                        <h1 className="display-3">Your Bookmarks Repositories</h1>
                        <button id="deleteRepos" onClick={this.resetBookmarks} type="button" className="btn btn-danger bmd-btn-fab">
                            <i className="material-icons">delete</i>
                        </button>
                    </div>
                ) : '' }
                {this.state.bookmarks.length ? (
                    this.state.bookmarks.map((repo, key) => {
                        return (
                            <div key={repo.id} className="col-xl-3 mb-3 mt-3">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-start align-items-center">
                                            <h5 className="card-title">{repo.Name}</h5>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center card-actions">
                                            <div className="d-flex justify-content-between align-items-center repo-stats pl-0 col-6">
                                                <span><i className="fas fa-star"></i><span className="pl-1">{repo.Forks}</span></span>
                                            </div>
                                            <button id={repo.id} onClick={this.bookmarkRepo} className="btn btn-raised btn-primary">Bookmark</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ) : (<div className="d-flex text-center flex-column p-4 m-auto">
                    <h1 className="display-2">No Bookmarks Yet</h1>
                    <h2>Please Add Bookmarks First</h2>
                    <a href="/" className="btn btn-raised btn-primary">Back</a>
                </div>)}
            </div>
        );
    }
}

ReactDOM.render(
    <NameForm />,
    document.getElementById('app')
);