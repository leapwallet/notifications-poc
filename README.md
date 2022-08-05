# Notifications POC

POC for frontends to get notified of blockchain data that they're interested in. This project uses [Subquery](https://subquery.network/) to notify web browsers when the Cosmos Hub wallet having the address cosmos19vf5mfr40awvkefw69nl6p3mmlsnacmm28xyqh receives cryptocurrency.

## Installation

1. Install [Docker](https://docs.docker.com/get-docker/).
2. Install the latest [Node.js](https://nodejs.org/en/download/) LTS.
3. Clone the repo using one of the following methods:
    - SSH:

        ```shell
        git clone git@github.com:leapwallet/notifications-poc.git
        ```    
    - HTTPS:

        ```shell
        git clone https://github.com/leapwallet/notifications-poc.git
        ```
4. Install the backend:

    ```shell
    cd notifications-poc/backend && yarn && yarn codegen && yarn build
    ```
5. Install the frontend:

    ```shell
    cd ../frontend && npm i
    ```

## Usage

1. Start the backend:

    ````shell
    cd backend && yarn start:docker
    ````
2. Start the frontend in another terminal session:

    ```shell
    cd frontend && npm start
    ```

    Open the URL printed to the console in your browser, and allow notifications to see the demo.
3. Once you're done:
    1. In the frontend's terminal session, enter `Ctrl+C`.
    2. In the backend's terminal session:
        1. Enter `Ctrl+C`
        2. Shut down the backend:

            ```shell
            docker compose down
            ```            

## License

This project is under the [MIT License](LICENSE).
