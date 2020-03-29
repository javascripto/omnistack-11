import { Feather } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text } from  'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import styles from './styles';
import api from '../../services/api';
import logo from '../../assets/logo.png';

export interface Incident {
  id: number;
  uf: string;
  city: string;
  name: string;
  value: number;
  title: string;
  email: string;
  ong_id: string;
  whatsapp: string;
  description: string;
}

export function currencyPipe(value: number) {
  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

export function Incidents() {
  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    loadInstance();
  }, []);

  async function loadInstance() {
    const ALL_LOADED = total > 0 && incidents.length === total;
    if (loading || ALL_LOADED) return;

    setLoading(true);
    const response = await api.get('incidents', { params: { page } });
    setLoading(false);
    setPage(page + 1);
    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers['x-total-count'])
  }

  function navigateToDetail(incident: Incident) {
    navigation.navigate('Detail', {
      incident
    });
  }

  const TWENTY_PERCENT_BEFORE_THE_END_OF_THE_LIST = 0.2;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
      </View>
      <Text style={styles.title}>Bem vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

      <FlatList
        data={incidents}
        style={styles.incidentList}
        onEndReached={loadInstance}
        showsVerticalScrollIndicator={false}
        keyExtractor={incident => String(incident.id)}
        onEndReachedThreshold={TWENTY_PERCENT_BEFORE_THE_END_OF_THE_LIST}
        renderItem={({item : incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>Valor:</Text>
            <Text style={styles.incidentValue}>{currencyPipe(incident.value)}</Text>

            <TouchableOpacity
              onPress={() => navigateToDetail(incident)}
              style={styles.detailsButton}>
                <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                <Feather name="arrow-right" size={16} color="#e02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
