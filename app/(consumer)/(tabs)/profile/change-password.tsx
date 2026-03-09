import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema, type ChangePasswordFormData } from "@/src/schemas";
import { useChangePassword } from "@/src/hooks";

export default function ChangePasswordScreen() {
  const router = useRouter();
  const mutation = useChangePassword();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { senha_atual: "", nova_senha: "", nova_senha_confirmation: "" },
  });

  const onSubmit = (data: ChangePasswordFormData) => {
    mutation.mutate({ senha_atual: data.senha_atual, nova_senha: data.nova_senha }, {
      onSuccess: () => {
        Alert.alert("Sucesso", "Senha alterada com sucesso!");
        router.back();
      },
      onError: () => Alert.alert("Erro", "Senha atual incorreta."),
    });
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white px-6 pt-6"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text className="text-2xl font-bold mb-6">Alterar Senha</Text>

      <Text className="text-sm font-medium text-gray-700 mb-1">Senha Atual</Text>
      <View className="relative">
        <Controller
          control={control}
          name="senha_atual"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 pr-20 mb-1 text-base"
              placeholder="Sua senha atual"
              secureTextEntry={!showPassword}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <TouchableOpacity
          className="absolute right-3 top-3"
          onPress={() => setShowPassword(!showPassword)}
          accessibilityLabel={showPassword ? "Ocultar senha" : "Mostrar senha"}
        >
          <Text className="text-gray-500 text-sm">{showPassword ? "Ocultar" : "Mostrar"}</Text>
        </TouchableOpacity>
      </View>
      {errors.senha_atual && (
        <Text className="text-red-500 text-xs mb-3">{errors.senha_atual.message}</Text>
      )}

      <Text className="text-sm font-medium text-gray-700 mb-1 mt-3">Nova Senha</Text>
      <View className="relative">
        <Controller
          control={control}
          name="nova_senha"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 pr-20 mb-1 text-base"
              placeholder="Nova senha (mínimo 6 caracteres)"
              secureTextEntry={!showPassword}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <TouchableOpacity
          className="absolute right-3 top-3"
          onPress={() => setShowPassword(!showPassword)}
          accessibilityLabel={showPassword ? "Ocultar senha" : "Mostrar senha"}
        >
          <Text className="text-gray-500 text-sm">{showPassword ? "Ocultar" : "Mostrar"}</Text>
        </TouchableOpacity>
      </View>
      {errors.nova_senha && (
        <Text className="text-red-500 text-xs mb-3">{errors.nova_senha.message}</Text>
      )}

      <Text className="text-sm font-medium text-gray-700 mb-1 mt-3">Confirmar Nova Senha</Text>
      <View className="relative">
        <Controller
          control={control}
          name="nova_senha_confirmation"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 pr-20 mb-1 text-base"
              placeholder="Repita a nova senha"
              secureTextEntry={!showPassword}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <TouchableOpacity
          className="absolute right-3 top-3"
          onPress={() => setShowPassword(!showPassword)}
          accessibilityLabel={showPassword ? "Ocultar senha" : "Mostrar senha"}
        >
          <Text className="text-gray-500 text-sm">{showPassword ? "Ocultar" : "Mostrar"}</Text>
        </TouchableOpacity>
      </View>
      {errors.nova_senha_confirmation && (
        <Text className="text-red-500 text-xs mb-3">{errors.nova_senha_confirmation.message}</Text>
      )}

      <TouchableOpacity
        className="bg-blue-600 rounded-lg py-4 items-center mt-6"
        onPress={handleSubmit(onSubmit)}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white font-semibold text-base">Alterar Senha</Text>
        )}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
