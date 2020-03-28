import React from 'react';
import { Feather } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image,TouchableOpacity, Linking } from  'react-native';

import styles from './styles';
import logo from '../../assets/logo.png';

export function Detail() {
  const navigation = useNavigation();
  const message = 'Olá APAD, estou entrando em contato pois gostaria de ' +
                  'ajudar no caso "Cadelinha atropelada" com o valor de R$ 120';

  function navigateBack() {
    navigation.goBack();
  }

  function sendWhatsapp() {
    const phone = '554788912960';
    Linking.openURL(`whatsapp://send?phone=${phone}&text=${message}`)
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Herói do caso: Cadelinha atropelada`,
      recipients: ['diego@rocketseat.com.br'],
      body: message,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} />
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#e02041" />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, {marginTop: 0}]}>ONG:</Text>
        <Text style={styles.incidentValue}>APAD</Text>

        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>Cadelinha atropelada</Text>

        <Text style={styles.incidentProperty}>Valor:</Text>
        <Text style={styles.incidentValue}>R$ 120,00</Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói dess caso.</Text>

        <Text style={styles.heroDescription}>Entre em contato:</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <Text style={styles.actionText}>Whatsapp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
