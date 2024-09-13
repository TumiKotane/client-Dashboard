import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, Button, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native"; // react-navigation for navigation

interface User {
  uuid: string;
  name: string;
  email: string;
  role: string;
}

const Userlist: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigation = useNavigation(); // For navigation

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get<User[]>("http://192.168.137.226:5000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      await axios.delete(`http://192.168.137.226:5000/users/${userId}`);
      getUsers();
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  return (
    <View>
      <Text style={{ fontSize: 24 }}>Users</Text>
      <Text style={{ fontSize: 18 }}>List of Users</Text>
      <Button title="Add New" onPress={() => navigation.navigate("AddUser")} />
      <FlatList
        data={users}
        keyExtractor={(user) => user.uuid}
        renderItem={({ item, index }) => (
          <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
            <Text>{index + 1}. {item.name}</Text>
            <Text>{item.email}</Text>
            <Text>{item.role}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("EditUser", { userId: item.uuid })}>
              <Text style={{ color: "blue" }}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteUser(item.uuid)}>
              <Text style={{ color: "red" }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default Userlist;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// // Define the User interface based on the expected structure of the user data
// interface User {
//   uuid: string;
//   name: string;
//   email: string;
//   role: string;
// }

// const Userlist: React.FC = () => {
//   // Use the User type for the users state
//   const [users, setUsers] = useState<User[]>([]);

//   useEffect(() => {
//     getUsers();
//   }, []);

//   // Define the type of userId as string for the deleteUser function
//   const getUsers = async () => {
//     try {
//       const response = await axios.get<User[]>("http://localhost:5000/users"); //change to "localhost" in place of IP
//       setUsers(response.data);
//     } catch (error) {
//       // Handle errors here if necessary
//       console.error("Failed to fetch users", error);
//     }
//   };

//   const deleteUser = async (userId: string) => {
//     try {
//       await axios.delete(`http://localhost:5000/users/${userId}`); //change to "localhost" in place of IP
//       getUsers();
//     } catch (error) {
//       // Handle errors here if necessary
//       console.error("Failed to delete user", error);
//     }
//   };

//   return (
//     <div>
//       <h1 className="title">Users</h1>
//       <h2 className="subtitle">List of Users</h2>
//       <Link to="/users/add" className="button is-primary mb-2">
//         Add New
//       </Link>
//       <table className="table is-striped is-fullwidth">
//         <thead>
//           <tr>
//             <th>No</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Role</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user, index) => (
//             <tr key={user.uuid}>
//               <td>{index + 1}</td>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//               <td>{user.role}</td>
//               <td>
//                 <Link
//                   to={`/users/edit/${user.uuid}`}
//                   className="button is-small is-info"
//                 >
//                   Edit
//                 </Link>
//                 <button
//                   onClick={() => deleteUser(user.uuid)}
//                   className="button is-small is-danger"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Userlist;
