<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;


class DoctorReauest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'state' => 'required|string|max:255',
                'city' => 'required|string|max:255',
                'street' => 'required|string|max:255',
                'phone_number' => 'sometimes|string|regex:/^[0-9]{10,20}$/',
                'territory' => 'sometimes|string|max:255',
                 'email' => [
                  'sometimes',
                  'string',
                   'email',
                   'max:255',
                    Rule::unique('doctors')->ignore($this->route('id')),
            ],
                'specialization' => 'required|string|max:225',
                'class_rate' => 'nullable|string|in:A,B,C',

        ];
    }
}
