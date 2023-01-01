import Body from '../components/Body'
import Posts from '../components/Posts'
import CreatePostForm from '../forms/CreatePostForm';

export default function FeedPage() {
    return (
        <Body>
            <CreatePostForm />
            <Posts />
        </Body>
    )
}