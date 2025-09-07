import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Settings as SettingsIcon, User, Shield, Database, Bell, LogOut, Info } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminSettingsScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: async () => {
            await signOut();
            router.replace('/');
          }
        }
      ]
    );
  };

  const settingsOptions = [
    {
      title: 'Profile Settings',
      description: 'Manage your admin profile',
      icon: User,
      color: '#007AFF',
      onPress: () => Alert.alert('Coming Soon', 'Profile settings will be available soon')
    },
    {
      title: 'Security',
      description: 'Password and security settings',
      icon: Shield,
      color: '#34C759',
      onPress: () => Alert.alert('Coming Soon', 'Security settings will be available soon')
    },
    {
      title: 'Database Management',
      description: 'Backup and restore data',
      icon: Database,
      color: '#FF9500',
      onPress: () => Alert.alert('Coming Soon', 'Database management will be available soon')
    },
    {
      title: 'Notifications',
      description: 'Configure notification settings',
      icon: Bell,
      color: '#AF52DE',
      onPress: () => Alert.alert('Coming Soon', 'Notification settings will be available soon')
    },
    {
      title: 'About',
      description: 'App version and information',
      icon: Info,
      color: '#6B6B6B',
      onPress: () => Alert.alert('Campus Connect', 'Version 1.0.0\nBuilt with React Native and Expo')
    }
  ];

  return (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerStats}>
          <Text style={styles.headerStatsText}>Admin Panel</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'AD'}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user?.name || 'Administrator'}</Text>
              <Text style={styles.profileEmail}>{user?.email || 'admin@college.edu'}</Text>
              <Text style={styles.profileRole}>System Administrator</Text>
            </View>
          </View>
        </View>

        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsList}>
            {settingsOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.settingCard}
                onPress={option.onPress}
              >
                <View style={styles.settingHeader}>
                  <View style={[styles.settingIcon, { backgroundColor: option.color }]}>
                    <option.icon size={24} color="#FFFFFF" />
                  </View>
                  <View style={styles.settingInfo}>
                    <Text style={styles.settingTitle}>{option.title}</Text>
                    <Text style={styles.settingDescription}>{option.description}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color="#FF3B30" />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerStats: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  headerStatsText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#6B6B6B',
    marginBottom: 2,
  },
  profileRole: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
  },
  settingsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  settingsList: {
    gap: 12,
  },
  settingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  settingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: '#6B6B6B',
  },
  logoutSection: {
    marginBottom: 40,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 16,
    gap: 8,
    borderWidth: 2,
    borderColor: '#FF3B30',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF3B30',
  },
});