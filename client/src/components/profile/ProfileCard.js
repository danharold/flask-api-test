import {
    Card,
    CardBody,
    Typography
} from '@material-tailwind/react';

import pfp from '../../assets/defaultpfp.jpeg';

export default function ProfileCard({pageUser}) {
    return (
        <Card>
            <CardBody>
                <div className="flex flex-grow items-center">
                    <img src={pfp} alt="profile" className="bg-gray-300 rounded-md w-20 float-left"/>
                    <div className="ml-4">
                        <h1 className="mb-0 text-3xl text-black font-sans">
                            {pageUser.display_username}
                        </h1>
                        <p className="mt-0 text-gray-600">
                            @{pageUser.username}
                        </p>
                    </div>
                </div>
                <Typography className="mt-4">
                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
                </Typography>
            </CardBody>
        </Card>
    )
}