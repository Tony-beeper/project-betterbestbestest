import { IconButton } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";

const GitHubOauthButton = ({ id, oauth }) => {
  return (
    <div>
      {!oauth ? (
        <IconButton
          disabled={oauth}
          onClick={() => {
            const client_id = process.env.REACT_APP_CLIENT_ID;
            const redirect_url = process.env.REACT_APP_REDIRECT_URL;
            window.location.href =
              `https://github.com/login/oauth/authorize?client_id=${client_id}&` +
              `redirect_uri=${redirect_url}${id}` +
              `&scope=repo`;
            return null;
          }}
        >
          <GitHubIcon />
        </IconButton>
      ) : (
        <IconButton color="primary">
          <GitHubIcon />
        </IconButton>
      )}
    </div>
  );
};

export default GitHubOauthButton;
