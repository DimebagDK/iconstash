import Reflux from 'reflux';

export var iconActions = Reflux.createActions([
    'pullIcons',
    'setViewStyle',
    'setAppTheme'
]);

class iconStore extends Reflux.Store {
	constructor() {
		super();
		this.state = {
            loadingError: null,
            isLoading: true,
            icons: [],
            iconViewStyle: 1,
            appTheme : 1
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
    setViewStyle = (value) => {
        const i = parseInt(value, 10);
        this.setState({iconViewStyle: i});
    }
    setAppTheme = (value) => {
        const i = parseInt(value, 10);
        this.setState({appTheme: i});
    }
}

export default iconStore;