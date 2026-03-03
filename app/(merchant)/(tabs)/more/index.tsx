import { useMemo } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/src/stores";
import { useMultilojaStore } from "@/src/stores/multiloja.store";
import type { Empresa } from "@/src/types/merchant";

type Perfil = Empresa["perfil"];

const MENU_ITEMS = [
  { icon: "📢", label: "Campanhas", route: "/(merchant)/(tabs)/more/campanhas", perfis: ["proprietario", "gestor", "operador"] as Perfil[] },
  { icon: "🛒", label: "Vendas", route: "/(merchant)/(tabs)/more/vendas", perfis: ["proprietario", "gestor", "operador", "vendedor"] as Perfil[] },
  { icon: "⚖️", label: "Contestações", route: "/(merchant)/(tabs)/more/contestacoes", perfis: ["proprietario", "gestor", "operador"] as Perfil[] },
  { icon: "📊", label: "Relatórios", route: "/(merchant)/(tabs)/more/relatorios", perfis: ["proprietario", "gestor"] as Perfil[] },
  { icon: "⚙️", label: "Configurações", route: "/(merchant)/(tabs)/more/config", perfis: ["proprietario", "gestor"] as Perfil[] },
];

export default function MoreMenuScreen() {
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);
  const isMultiloja = useMultilojaStore((s) => s.isMultiloja);
  const empresaAtiva = useMultilojaStore((s) => s.empresaAtiva);
  const perfil = empresaAtiva?.perfil ?? "vendedor";

  const visibleItems = useMemo(
    () => MENU_ITEMS.filter((item) => item.perfis.includes(perfil)),
    [perfil],
  );

  const handleLogout = () => {
    Alert.alert("Sair", "Deseja realmente sair da conta?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/(auth)/login");
        },
      },
    ]);
  };

  return (
    <View className="flex-1 bg-gray-50 pt-4">
      <Text className="text-2xl font-bold px-4 mb-4">Mais</Text>

      <View className="bg-white rounded-xl mx-4 overflow-hidden mb-4">
        {visibleItems.map((item, i) => (
          <TouchableOpacity
            key={item.label}
            className={`flex-row items-center px-4 py-4 ${i < visibleItems.length - 1 ? "border-b border-gray-100" : ""}`}
            onPress={() => router.push(item.route)}
          >
            <Text className="text-lg mr-3">{item.icon}</Text>
            <Text className="flex-1 text-base">{item.label}</Text>
            <Text className="text-gray-300">›</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="bg-white rounded-xl mx-4 overflow-hidden mb-4">
        {isMultiloja() && (
          <TouchableOpacity
            className="flex-row items-center px-4 py-4 border-b border-gray-100"
            onPress={() => router.push("/(merchant)/multiloja")}
          >
            <Text className="text-lg mr-3">🔄</Text>
            <Text className="flex-1 text-base">Trocar empresa</Text>
            <Text className="text-gray-300">›</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          className="flex-row items-center px-4 py-4"
          onPress={() => router.push("/(shared)/privacy-policy")}
        >
          <Text className="text-lg mr-3">📄</Text>
          <Text className="flex-1 text-base">Política de Privacidade</Text>
          <Text className="text-gray-300">›</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        className="bg-red-50 rounded-xl mx-4 py-4 items-center mt-4"
        onPress={handleLogout}
      >
        <Text className="text-red-600 font-semibold">Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
