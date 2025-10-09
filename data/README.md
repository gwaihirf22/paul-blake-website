# Party RSVP Data Directory

This directory stores RSVP submissions for Lucy's Party.

## Important Notes

**⚠️ Data Persistence:**
- This directory is mounted as a Docker volume in production (see `docker-compose.yml`)
- The `party-rsvps.json` file persists between deployments
- When you update the site, RSVPs are preserved on the server

**🔒 Security:**
- This data is tracked in git for initial setup
- The production server's data file will diverge from git (it will have real RSVPs)
- Never overwrite the production data file manually

## Files

- `party-rsvps.json` - JSON array of RSVP submissions
- `.gitkeep` - Ensures directory structure is preserved in git
- `README.md` - This file

## Recovery

If you need to backup or restore RSVPs from the production server:

```bash
# Backup from server
docker cp paul-blake-site:/app/data/party-rsvps.json ~/party-rsvps-backup.json

# Restore to server (be careful!)
docker cp ~/party-rsvps-backup.json paul-blake-site:/app/data/party-rsvps.json
```

## Deployment

The volume mount in `docker-compose.yml` maps:
- Host: `./data` (relative to docker-compose.yml)
- Container: `/app/data`

This ensures RSVPs persist between container restarts and updates.
