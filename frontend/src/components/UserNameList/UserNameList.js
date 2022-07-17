import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { deepOrange, deepPurple } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  icons: {
    display: "flex",
    flexDirection: "row",
    "& > *": {
      marginRight: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

const UserNameList = ({ users }) => {
  const classes = useStyles();

  return (
    <div className={classes.icons}>
      {users.map((member, idx) => (
        <Avatar
          key={`member_${idx}`}
          className={classes.small}
          style={{
            backgroundColor: ["#ffc107", deepPurple[500], deepOrange[500]][
              idx % 3
            ],
          }}
        >
          {member.slice(0, 1).toUpperCase()}
        </Avatar>
      ))}
    </div>
  );
};

export default UserNameList;
