#!/usr/bin/env node

const https = require('https');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Digite o endereço IP a ser consultado: ', (ip) => {
  if (!ip || ip.trim() === '') {
    console.log('IP inválido. Encerrando.');
    rl.close();
    return;
  }

  const url = `http://ip-api.com/json/${ip}?fields=status,message,country,regionName,city,zip,isp,query`;

  https.get(url, (res) => {
    let dados = '';

    res.on('data', (chunk) => {
      dados += chunk;
    });

    res.on('end', () => {
      try {
        const data = JSON.parse(dados);

        if (data.status === 'fail') {
          console.log(`Erro: ${data.message}`);
        } else {
          console.log('\n📍 Informações do IP:');
          console.log(`🧾 IP: ${data.query}`);
          console.log(`🌎 País: ${data.country}`);
          console.log(`🏙️  Região: ${data.regionName}`);
          console.log(`🏘️  Cidade: ${data.city}`);
          console.log(`📮 CEP: ${data.zip}`);
          console.log(`📡 Provedor: ${data.isp}`);
        }
      } catch (err) {
        console.error('Erro ao processar resposta:', err.message);
      }

      rl.close();
    });

  }).on('error', (err) => {
    console.error('Erro na requisição:', err.message);
    rl.close();
  });
});

<!-- BY: NonatoSec -->
