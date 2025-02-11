# TrackFleet - Mobile

## Visão Geral

O **TrackFleet** é um aplicativo projetado para auxiliar na gestão de veículos e entregas, permitindo operação mesmo sem conectividade. O aplicativo é utilizado por motoristas para registrar e monitorar a entrega de veículos entre unidades.

## Funcionalidades

- **Registro de entregas**: Os motoristas podem registrar as entregas de veículos.

* **Suporte offline**: Operação sem conexão, com sincronização posterior dos dados.
* **Histórico de entregas**: Acompanhamento das movimentações realizadas.
* **Integração com PostgreSQL**: Armazenamento e gerenciamento dos dados.

## Tecnologias Utilizadas

- **RealmDB** para salvamento local.
- **PostgreSQL** para o banco de dados.
- **React Native** para a aplicação mobile.
- **Google Cloud** para login.

## Como Rodar

### 1. Configurar o Backend

Para rodar o projeto, primeiro é necessário iniciar o servidor backend. As instruções de comorepositório do backend está disponível em:

[TrackFleet - Backend](https://github.com/alexmeirels/TrackFleet---back-end)

### 2. Configurar o Frontend

1. Clone o repositório do projeto mobile e instale as dependências:

   ```sh
   yarn install
   ```

2. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes credenciais:

   ```ini
   EXPO_PUBLIC_ANDROID_CLIENT_ID=
   EXPO_PUBLIC_IOS_CLIENT_ID=
   EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=
   EXPO_PUBLIC_API_URL=http://localhost:3000/  # Ajuste conforme a porta utilizada
   ```

   - As três primeiras variáveis podem ser obtidas no **Google Cloud Console**.
   - Para obter o **ANDROID_CLIENT_ID** e o **IOS_CLIENT_ID**, utilizados no Sign-in do Google, siga o tutorial detalhado no vídeo: [Configuração do Google Sign-in](https://www.youtube.com/watch?v=BDeKTPQzvR4&t).
   - Para obter a **GOOGLE_MAPS_API_KEY**, siga as instruções disponíveis no link: [Ativar API do Google Maps](https://developers.google.com/maps/documentation/directions/cloud-setup?hl=pt-br).

3. Para rodar no **Android**:

   ```sh
   npx expo run:android
   ```

   - Após executar o comando, um QRCode será gerado. Utilize o aplicativo **Expo Go** no celular para escanear e rodar o app.

4. Para rodar no **iOS**:

   ```sh
   expo run:ios
   ```

   - Siga o mesmo procedimento do Android, utilizando o **Expo Go**.

Agora, seu ambiente está pronto para utilizar o **TrackFleet**! 🚀
