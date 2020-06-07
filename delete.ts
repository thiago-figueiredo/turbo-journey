const [regex, arg1, arg2] = Deno.args;

const token = arg2 || arg1;

let response = await fetch(
  "https://api-stage.twiagemed.net/v4/users",
  {
    headers: {
      authorization: `JWT ${token}`,
    },
    method: "GET",
  },
);

let data = await response.json();

if (data.length === 0) {
    console.log("no users");
    Deno.exit();
}

type Member = {
    _id: string;
    email: string;
};

const pattern = RegExp(regex);

if (arg1 === "DRY") {
    console.log("Users to delete");
    const x = data.filter((member: Member) =>
        pattern.test(member.email)
    ).map((member: Member) => `${member.email} :: ${member._id}`);
    console.log(x);
    console.log(x.length);
    Deno.exit();
}

const membersToDelete = data.filter((member: Member) =>
  pattern.test(member.email)
).map((member: Member) => ({ id: member._id, email: member.email }));

let i = 0;

const paddingLength = membersToDelete.length.toString().length;

while (membersToDelete.length > 0) {
  const { id:userID, email:userEmail } = membersToDelete.shift();

  response = await fetch(
    `https://api-stage.twiagemed.net/v4/users/${userID}`,
    {
      headers: {
        authorization: `JWT ${token}`,
      },
      method: "DELETE",
    },
  );
  console.log(
    String(++i).padStart(paddingLength, "0"),
    userID,
    userEmail,
    response.statusText,
  );
}
