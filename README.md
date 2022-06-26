# remote-control

## Installing

- `git clone https://github.com/Serhii1108/remote-control.git`
- `git checkout develop`
- `npm install`

## Running

- Development mode: `npm run start:dev`
- Production mode: `npm run start` or `npm run start:prod`
- Build: `npm run build`

## Useful information

- Front URL: <http://localhost:3000/>
- Websocket server default port: `8080`

## Scoring

- ### Basic Scope

  - Websocket
    - **+6** Implemented workable websocket server
    - **+10** Websocket server message handler implemented properly
    - **+10** Websocket server message sender implemented properly
  - Navigation
    - **+4** Move mouse up implemented properly
    - **+4** Move mouse down implemented properly
    - **+4** Move mouse left implemented properly
    - **+4** Move mouse right implemented properly
    - **+4** Send mouse coordinates implemented properly
  - Drawing
    - **+6** Draw circle implemented properly
    - **+6** Draw rectangle implemented properly
    - **+6** Draw square implemented properly
  - Screen image
    - **+30** Send screen image implemented properly (optionally)

- ### Advanced Scope

  - **+30** Task implemented on Typescript
  - **+20** All data transfer operations with send/get should be performed using Streams API
  - **+20** Codebase is separated (at least 4 modules)
