import Body from '../components/Body'

export default function Error404() {
    return(
        <Body>
            <h1>404: {window.location.pathname} path not found</h1>
        </Body>
    );
}