import hashlib
password = 'LuchengAdmin2026!'
hash_value = hashlib.sha256(password.encode()).hexdigest()
print(f"注册码: {password}")
print(f"SHA-256: {hash_value}")