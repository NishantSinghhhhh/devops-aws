import { client } from "@repo/db/";

export default async function Home() {
    // Fetch the first user from the database
    const user = await client.user.findFirst();

    // Handle the case where no user is found in the database
    if (!user) {
        return (
            <div>
                <p>No user found.</p>
            </div>
        );
    }

    // Render the user's information
    return (
        <div>
            <p>Username: {user.username}</p>
            {/* SECURITY WARNING: 
              Never display a password, even a hashed one, in your UI.
              This line is intentionally removed for security.
            */}
        </div>
    );
}
