import router from '../router'


export default (error) => {
    console.log('ERROR', error.response);
    if (error) {
        switch (true) {
            case error.response.status == 401:
                router.app.$notify({
                    type: 'error',
                    title: 'Unauthorize',
                    text: error.response.data
                });
                // router.push('/sign-in');
                break;
            case error.response.status == 404:
                router.app.$notify({
                    type: 'error',
                    title: 'Not Found',
                    text: String(error.response.data).length > 20 ? 'Sorry, requested not found.' : error.response.data
                });
                break;

            default:
                router.app.$notify({
                    type: 'error',
                    title: error.title,
                    text: error.response.data || error.message
                });
                break;
        }
        throw error;
    }
}