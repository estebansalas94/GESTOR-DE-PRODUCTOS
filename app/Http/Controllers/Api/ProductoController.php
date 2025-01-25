<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductoController extends Controller
{
    public function index()
    {
        $data = Producto::orderBy('id','desc')->get();
        return response()->json($data, 200);
    }

    public function show($id)
    {
        $data = Producto::find($id);
        if($data){
            return response()->json($data, 200);
        }else{
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:255', 
            'precio' => 'required|numeric|gt:0',  
            'cantidad' => 'required|integer', 
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422); 
        }
        $data = Producto::create($request->all());
        return response()->json($data, 201);
    }

    public function update(Request $request, $id)
    {
        $data = Producto::find($id);
        if($data){
            $data->update($request->all());
            return response()->json($data, 200);
        }else{
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }
    }

    public function destroy($id)
    {
        $data = Producto::find($id);
        if($data){
            $data->delete();
            return response()->json(['message' => 'Producto eliminado'], 200);
        }else{
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }
    }
}
