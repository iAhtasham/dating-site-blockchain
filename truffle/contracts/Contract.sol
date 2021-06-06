pragma solidity >=0.4.22 <0.9.0;

contract Contract {
    struct User {
        string username;
        string email;
        string bio;
        string gender;
        string[] interests;
        string profilePicture;
        uint age;
        Location location;
        bool isRegistered;
        LikesDislikes likesDislikes;
    }

    struct Location {
        uint256 latitude;
        uint256 longitude;
    }

    struct LikesDislikes {
        string[] likes;
        string[] dislikes;
    }

    mapping(string => User) private users;
    string[] private usernames;
    mapping(address => string) private accounts;

    function registerUser(
        string memory username,
        string memory email,
        string memory bio,
        string memory gender,
        string[] memory interests,
        string memory profilePicture,
        uint age,
        Location memory location
    ) public {
        require(!users[username].isRegistered, "User already registered.");
        require(
            bytes(accounts[msg.sender]).length == 0,
            "Account already registered."
        );

        users[username] = User(
            username,
            email,
            bio,
            gender,
            interests,
            profilePicture,
            age,
            location,
            true,
            LikesDislikes(new string[](0), new string[](0))
        );
        usernames.push(username);
        accounts[msg.sender] = username;
    }

    function currentUser(
        string memory username
    ) public view returns (User memory) {
        return users[username];
    }

    function isUserRegistered() public view returns (bool) {
        return bytes(accounts[msg.sender]).length != 0;
    }

    function editProfile(
        string memory username,
        string memory newBio,
        string memory newProfilePicture
    ) public {
        require(users[username].isRegistered, "User not registered.");
        users[username].bio = newBio;
        users[username].profilePicture = newProfilePicture;
    }

    function likeUser(
        string memory username,
        string memory targetUsername
    ) public {
        require(users[username].isRegistered, "User not registered.");
        require(
            users[targetUsername].isRegistered,
            "Target user not registered."
        );
        users[targetUsername].likesDislikes.likes.push(username);
    }

    function dislikeUser(
        string memory username,
        string memory targetUsername
    ) public {
        require(users[username].isRegistered, "User not registered.");
        require(
            users[targetUsername].isRegistered,
            "Target user not registered."
        );
        users[targetUsername].likesDislikes.dislikes.push(username);
    }

    function getLikesDislikes(
        string memory username
    ) public view returns (string[] memory likes, string[] memory dislikes) {
        require(users[username].isRegistered, "User not registered.");
        return (
            users[username].likesDislikes.likes,
            users[username].likesDislikes.dislikes
        );
    }

    function findMatches(
        string memory username,
        uint minAge,
        uint maxAge,
        uint maxDistance
    ) public view returns (string[] memory) {
        require(users[username].isRegistered, "User not registered.");

        User storage currentUser = users[username];
        uint256 count = 0;

        for (uint256 i = 0; i < usernames.length; i++) {
            User storage user = users[usernames[i]];
            if (
                user.age >= minAge &&
                user.age <= maxAge &&
                calculateDistance(currentUser.location, user.location) <=
                maxDistance
            ) {
                count++;
            }
        }

        string[] memory matches = new string[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < usernames.length; i++) {
            User storage user = users[usernames[i]];
            if (
                user.age >= minAge &&
                user.age <= maxAge &&
                calculateDistance(currentUser.location, user.location) <=
                maxDistance
            ) {
                matches[index] = user.username;
                index++;
            }
        }

        return matches;
    }

    function calculateDistance(
        Location memory location1,
        Location memory location2
    ) private pure returns (uint) {
        return
            abs(int(location1.latitude - location2.latitude)) +
            abs(int(location1.longitude - location2.longitude));
    }

    function abs(int x) private pure returns (uint) {
        return uint(x >= 0 ? x : -x);
    }
}
