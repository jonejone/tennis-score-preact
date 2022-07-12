import { Fragment, h } from 'preact';


const Loading = ({loading}: {loading: boolean}) => (
    <>
    {loading ? <div class="border mx-auto text-center">
        Loading data... :-)
    </div> : null}
    </>
)

export default Loading;