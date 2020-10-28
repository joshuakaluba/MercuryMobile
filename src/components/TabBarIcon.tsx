import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';

export function TabBarIcon(props: { name: string; color: string; }) {
  return <Ionicons size={30} style={{ marginBottom: -3, fontWeight: 'bold'}} {...props} />;
}
