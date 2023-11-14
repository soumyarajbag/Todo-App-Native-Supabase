import { View, Text , TouchableOpacity } from 'react-native'
import React from 'react'

const TodoTab = () => {
  return (
    <View className="bg-emerald-200 p-4 w-[80%]  rounded-xl space-y-2">
          <View className="flex-row items-center justify-between space-x-1">
                <Text  className="font-semibold text-gray-700">ChatGPT</Text>
                <TouchableOpacity>
                    <Text className="text-red-500 font-semibold">Delete</Text>
                    </TouchableOpacity>
            </View>
    </View>
  )
}

export default TodoTab