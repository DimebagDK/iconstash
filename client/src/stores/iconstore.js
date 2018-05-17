import Reflux from 'reflux';

export var iconActions = Reflux.createActions([
    'pullIcons',
]);

class iconStore extends Reflux.Store {
	constructor() {
		super();
		this.state = {
            loadingError: null,
            isLoading: true,
            icons: []
        };
        this.listenables = iconActions;
    }
    pullIcons = () => {
        this.setState({
            isLoading:true
        });
   
        fetch("/api/data/")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    loadingError:null,
                    isLoading:false,
                    icons:result
                });
            },
            (error) => {
                this.setState({
                    loadingError:error,
                    isLoading:false,
                    icons:[]
                });
            }
        )
    }
}

export default iconStore;