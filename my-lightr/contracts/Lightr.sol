// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

contract Lightr {
    enum InvitationStatus {
        PENDING,
        ACCEPTED,
        IGNORED
    }

    struct User {
        uint id;
        string userName;
        address userId;
        bytes email;
        bytes number;
        bytes pass;
        string profile;
    }

    struct Message {
        uint id;
        string content;
        address from;
        address to;
        uint date;
    }

    struct Invitation {
        address from;
        address to;
        InvitationStatus status;
    }

    /**
     * @dev events start...
     */
    event Registered(address indexed user);
    event Login(address indexed user);
    event Invite(address indexed from, address indexed to);
    event Accept(address indexed from, address indexed to);
    event SendMessage(address indexed from, string content);

    mapping(bytes => User) private usersByEmail; // map email to User
    mapping(bytes => User) private usersByNumber; // map number to User
    mapping(address => User) private usersByAddress; // map address to User
    mapping(address => bool) private isRegistered;
    mapping(uint256 => Message[]) private conversations;
    mapping(address => address[]) private userFriends;
    mapping(address => Invitation[]) private userInvitations;
    uint private nextUserId;
    uint private nextMessageId;
    address[] private userIds;

    function register(
        string memory userName,
        string memory number,
        string memory email,
        string memory pass,
        string memory profile
    ) external antiNullAddress {
        bytes memory emailBytes = bytes(email);
        bytes memory numberBytes = bytes(number);
        bytes memory passBytes = bytes(pass);
        _register(
            userName,
            msg.sender,
            numberBytes,
            emailBytes,
            passBytes,
            profile
        );
    }

    function logIn(
        string memory email,
        string memory number,
        string memory pass
    ) external antiNullAddress {
        _logIn(bytes(email), bytes(number), bytes(pass));
    }

    function sendMessage(
        address _from,
        address _to,
        string memory _content
    ) external userHasAccess {
        uint256 conversationId = uint256(
            keccak256(abi.encodePacked(_from, _to))
        );

        conversations[conversationId].push(
            Message({
                id: nextMessageId,
                content: _content,
                from: msg.sender,
                to: _to,
                date: block.timestamp
            })
        );
        emit SendMessage(_from, _content);
        nextMessageId++;
    }

    function getUserMessages(
        address _from,
        address _to
    ) external view returns (Message[] memory) {
        uint256 conversationId = uint256(
            keccak256(abi.encodePacked(_from, _to))
        );
        require(
            conversations[conversationId].length > 0,
            "No conversations have found"
        );

        return conversations[conversationId];
    }

    function getUserProfile(
        address userId
    ) external view userHasAccess returns (User memory) {
        User memory userData = usersByAddress[userId];
        require(
            userData.userId != address(0),
            "The user is not a valid address"
        );
        return userData;
    }

    function inviteFriend(address friendAddress) external userHasAccess {
        require(isRegistered[friendAddress], "The user is not registered");

        Invitation memory invitation = Invitation({
            from: msg.sender,
            to: friendAddress,
            status: InvitationStatus.PENDING
        });

        userInvitations[friendAddress].push(invitation);
    }

    function acceptInvitation(uint invitationIndex) external {
        Invitation storage invitation = userInvitations[msg.sender][
            invitationIndex
        ];

        require(invitation.to == msg.sender, "Not your invitation");
        require(
            invitation.status == InvitationStatus.PENDING,
            "Invitation already handled"
        );

        invitation.status = InvitationStatus.ACCEPTED;
        userFriends[invitation.from].push(msg.sender);
        userFriends[msg.sender].push(invitation.from);
    }

    function ignoreInvitation(uint invitationIndex) external {
        Invitation storage invitation = userInvitations[msg.sender][
            invitationIndex
        ];

        require(invitation.to == msg.sender, "Not your invitation");
        require(
            invitation.status == InvitationStatus.PENDING,
            "Invitation already handled"
        );

        invitation.status = InvitationStatus.IGNORED;
    }

    function getFriendsList() external view returns (address[] memory) {
        require(userFriends[msg.sender].length > 0, "No friends found");
        return userFriends[msg.sender];
    }

    function getInvitations() external view returns (Invitation[] memory) {
        return userInvitations[msg.sender];
    }

    /**
     * Internal functions start...
     */

    function _register(
        string memory _userName,
        address _userId,
        bytes memory _number,
        bytes memory _email,
        bytes memory _pass,
        string memory _profile
    ) internal {
        require(
            isRegistered[msg.sender] == false,
            "You already registered try to log in"
        );

        User memory newUser = User({
            id: nextUserId,
            userName: _userName,
            userId: _userId,
            number: _number,
            email: _email,
            pass: _pass,
            profile: _profile
        });

        // Store user in usersByAddress mapping
        usersByAddress[_userId] = newUser;

        if (_number.length > 0) {
            usersByNumber[_number] = newUser;
        }

        if (_email.length > 0) {
            usersByEmail[_email] = newUser;
        }
        emit Registered(_userId);
        userIds.push(_userId);
        isRegistered[_userId] = true;
        nextUserId++;
    }

    function _logIn(
        bytes memory _email,
        bytes memory _number,
        bytes memory _pass
    ) internal {
        require(
            _email.length > 0 || _number.length > 0,
            "Provide at least email or number"
        );
        User memory user;

        if (_email.length > 0) {
            user = usersByEmail[_email];
            require(user.userId != address(0), "User not found");
            require(
                keccak256(user.pass) == keccak256(bytes(_pass)),
                "Incorrect password"
            );
        }

        if (_number.length > 0) {
            user = usersByNumber[_number];
            require(user.userId != address(0), "User not found");
            require(
                keccak256(user.pass) == keccak256(bytes(_pass)),
                "Incorrect password"
            );
        }

        emit Login(msg.sender);
    }

    /**
     * Modifiers start...
     */

    modifier antiNullAddress() {
        require(
            msg.sender != address(0),
            "Not null address allowed to register / log in"
        );
        _;
    }

    modifier userHasAccess() {
        require(isRegistered[msg.sender], "Only registered users have access");
        _;
    }
}
