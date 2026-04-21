# Ribeiro Bank Mobile

Aplicativo profissional estilo banco digital para Android, feito em React Native + Expo.

## Rodar localmente
```bash
npm install
npm start
```

## Gerar APK de teste
```bash
npx eas build --platform android --profile preview
```

## Gerar arquivo para Play Store
```bash
npx eas build --platform android --profile production
```

## Observações
- Troque os ícones em `assets/`
- Ajuste o pacote Android em `app.json`
- Conecte a URL do backend em `expo.extra.apiUrl`